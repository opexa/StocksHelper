using System.Linq;

namespace StocksHelper.Services.Models.Teams
{
	using AutoMapper;
	using System.Collections.Generic;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;
	using StocksHelper.Services.Models.Alerts;

	public class TeamViewModel : IHaveCustomMappings
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public string TeamPhoto { get; set; }

		public string RoleInTeam { get; set; }

		public IEnumerable<AlertViewModel> Alerts { get; set; }

		public void CreateMappings(IMapperConfigurationExpression configuration)
		{
			configuration.CreateMap<Team, TeamViewModel>()
				.ForMember(model => model.Alerts, x => x.MapFrom(src => src.Alerts.Take(3).AsQueryable().To<AlertViewModel>()));
		}
	}
}
