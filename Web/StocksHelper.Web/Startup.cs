using Microsoft.AspNetCore.SignalR;

namespace StocksHelper.Web
{
	using System;
	using System.Linq;
	using System.Net;
	using System.Security.Claims;
	using System.Security.Principal;
	using System.Text;
	using System.Threading.Tasks;
	using Newtonsoft.Json;

	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Diagnostics;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Identity;
	using Microsoft.AspNetCore.Mvc;
	using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.Configuration;
	using Microsoft.Extensions.DependencyInjection;
	using Microsoft.Extensions.Options;
	using Microsoft.IdentityModel.Tokens;
	using Microsoft.Extensions.Logging;
	using Microsoft.AspNetCore.Authentication.JwtBearer;

	using StocksHelper.Common;
	using StocksHelper.Data;
	using StocksHelper.Data.Common.Repositories;
	using StocksHelper.Data.Models;
	using StocksHelper.Data.Repositories;
	using StocksHelper.Data.Seeding;
	using StocksHelper.Services.Logging.Extensions;
	using StocksHelper.Services.Mapping;
	using StocksHelper.Services.Models.Teams;
	using StocksHelper.Services.Models.Alerts;
	using StocksHelper.Services.Models.Users;
	using StocksHelper.Services.DataServices;
	using StocksHelper.Services.Logging;
	using StocksHelper.Web.Infrastructure.Middlewares.Auth;
	using StocksHelper.Services.SignalR.Hubs;
	using StocksHelper.Services.BackgroundServices;

	public class Startup
	{
		private readonly IConfiguration configuration;

		public Startup(IConfiguration configuration)
		{
			this.configuration = configuration;
		}

		public void ConfigureServices(IServiceCollection services)
		{
			AutoMapperConfig.RegisterMappings(
				typeof(TeamViewModel).Assembly,
				typeof(UserSimpleViewModel).Assembly,
				typeof(AlertViewModel).Assembly,
				typeof(AlertInputModel).Assembly,
				typeof(AlertShortViewModel).Assembly,
				typeof(TeamMemberShortViewModel).Assembly,
				typeof(TeamAlertsViewModel).Assembly
			);

			// Framework services
			services.AddDbContext<ApplicationDbContext>(options =>
			{
				options.UseSqlServer(this.configuration.GetConnectionString("DefaultConnection"));
				options.UseLazyLoadingProxies();
			}, ServiceLifetime.Transient);

			services.AddTransient<ApplicationDbContext>();

			LoggingContext.ConnectionString = this.configuration.GetConnectionString("DefaultConnection");
			services.AddDbContext<LoggingContext>();

			var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JwtTokenValidation:Secret"]));

			services.Configure<TokenProviderOptions>(opts =>
			{
				opts.Audience = this.configuration["JwtTokenValidation:Audience"];
				opts.Issuer = this.configuration["JwtTokenValidation:Issuer"];
				opts.Path = "/api/account/login";
				opts.Expiration = TimeSpan.FromDays(15);
				opts.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
			});

			services
				.AddAuthentication()
				.AddJwtBearer(opts =>
				{
					opts.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = signingKey,
						ValidateIssuer = true,
						ValidIssuer = this.configuration["JwtTokenValidation:Issuer"],
						ValidateAudience = true,
						ValidAudience = this.configuration["JwtTokenValidation:Audience"],
						ValidateLifetime = true,
						LifetimeValidator = (before, expires, TokenAccessLevels, param) => { return expires > DateTime.UtcNow; }
					};
				});

			services
				.AddIdentity<ApplicationUser, ApplicationRole>(options =>
				{
					options.Password.RequiredLength = 6;
					options.Password.RequireDigit = false;
					options.Password.RequireLowercase = false;
					options.Password.RequireNonAlphanumeric = false;
					options.Password.RequireUppercase = false;
				})
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddUserStore<ApplicationUserStore>()
				.AddRoleStore<ApplicationRoleStore>()
				.AddDefaultTokenProviders();

			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

			// Data repositories
			services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

			// Identity stores
			services.AddTransient<IUserStore<ApplicationUser>, ApplicationUserStore>();
			services.AddTransient<IRoleStore<ApplicationRole>, ApplicationRoleStore>();

			services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
			services.AddScoped<ITeamsService, TeamsService>();
			services.AddScoped<IAlertsService, AlertsService>();
			services.AddScoped<IQuotesService, QuotesService>();

			services.AddHostedService<AlertsListenerService>();

			services.AddSingleton<AlertsHub>();

			services.AddSignalR();

			services.AddMvc()
							.SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
							.AddJsonOptions(options =>
							{
								options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
							});
			services.AddLogging();


			services.AddHttpClient("aplhavantage", c =>
			{
				c.BaseAddress = new Uri(configuration["AlphaVantagetApiEndpoint"]);
			});

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "client/build";
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(
			IApplicationBuilder app,
			IHostingEnvironment env,
			ILoggerFactory loggingFactory
		)
		{
			loggingFactory.AddContext(LogLevel.Warning);

			// Seed data on application startup
			using (var serviceScope = app.ApplicationServices.CreateScope())
			{
				var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

				if (env.IsDevelopment())
				{
					dbContext.Database.Migrate();
				}

				ApplicationDbContextSeeder.Seed(dbContext, serviceScope.ServiceProvider);
			}

			if (env.IsDevelopment())
			{
				app.UseExceptionHandler(application =>
				{
					application.Run(async context =>
					{
						context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
						context.Response.ContentType = GlobalConstants.JsonContentType;

						var ex = context.Features.Get<IExceptionHandlerFeature>();
						if (ex != null)
						{
							await context.Response
								.WriteAsync(JsonConvert.SerializeObject(new { ex.Error?.Message, ex.Error?.StackTrace }))
								.ConfigureAwait(continueOnCapturedContext: false);
						}
					});
				});
			}

			app.UseFileServer();

			app.UseJwtBearerTokens(
				app.ApplicationServices.GetRequiredService<IOptions<TokenProviderOptions>>(),
				PrincipalResolver);

			app.UseSignalR(routes =>
			{
				routes.MapHub<AlertsHub>("/alerts");
			});

			app.UseMvc(routes =>
			{
				routes.MapRoute(
									name: "default",
									template: "api/{controller}/{action}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "client";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}

		private static async Task<GenericPrincipal> PrincipalResolver(HttpContext context)
		{
			var email = context.Request.Form["email"];

			var userManager = context.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
			var user = await userManager.FindByEmailAsync(email);
			if (user == null)
			{
				return null;
			}

			var password = context.Request.Form["password"];

			var isValidPassword = await userManager.CheckPasswordAsync(user, password);
			if (!isValidPassword)
			{
				return null;
			}

			var roles = await userManager.GetRolesAsync(user);

			var identity = new GenericIdentity(email, "Token");
			identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));

			return new GenericPrincipal(identity, roles.ToArray());
		}
	}
}
