namespace StocksHelper.Data
{
	using System;
	using System.Linq;
	using System.Reflection;
	using System.Threading;
	using System.Threading.Tasks;

	using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
	using Microsoft.EntityFrameworkCore;
	using StocksHelper.Data.Models;

	public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
				: base(options)
		{
		}
		
		public override int SaveChanges() => this.SaveChanges(true);

		public override int SaveChanges(bool acceptAllChangesOnSuccess)
		{
			return base.SaveChanges(acceptAllChangesOnSuccess);
		}

		public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken)) =>
				this.SaveChangesAsync(true, cancellationToken);

		public override Task<int> SaveChangesAsync(
				bool acceptAllChangesOnSuccess,
				CancellationToken cancellationToken = default(CancellationToken))
		{
			return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			// Needed for Identity models configuration
			base.OnModelCreating(builder);

			ConfigureUserIdentityRelations(builder);

			var entityTypes = builder.Model.GetEntityTypes().ToList();
			
			// Disable cascade delete
			var foreignKeys = entityTypes
					.SelectMany(e => e.GetForeignKeys().Where(f => f.DeleteBehavior == DeleteBehavior.Cascade));
			foreach (var foreignKey in foreignKeys)
			{
				foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
			}
		}

		private static void ConfigureUserIdentityRelations(ModelBuilder builder)
		{
			builder.Entity<ApplicationUser>()
					.HasMany(e => e.Claims)
					.WithOne()
					.HasForeignKey(e => e.UserId)
					.IsRequired()
					.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<ApplicationUser>()
					.HasMany(e => e.Logins)
					.WithOne()
					.HasForeignKey(e => e.UserId)
					.IsRequired()
					.OnDelete(DeleteBehavior.Restrict);

			builder.Entity<ApplicationUser>()
					.HasMany(e => e.Roles)
					.WithOne()
					.HasForeignKey(e => e.UserId)
					.IsRequired()
					.OnDelete(DeleteBehavior.Restrict);
		}

		public virtual DbSet<TeamMember> TeamMembers { get; set; }

		public virtual DbSet<Team> Teams { get; set; }

		public virtual DbSet<Alert> Alerts { get; set; }

		public virtual DbSet<ApplicationLog> Logs { get; set; }
	}
}
