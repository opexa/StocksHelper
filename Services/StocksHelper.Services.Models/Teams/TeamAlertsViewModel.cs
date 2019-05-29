namespace StocksHelper.Services.Models.Teams
{
	using AutoMapper;
	using System.Linq;
	using System.Collections.Generic;
	using StocksHelper.Services.Mapping;
	using StocksHelper.Services.Models.Alerts;
	using StocksHelper.Data.Models;

	public class TeamAlertsViewModel : IHaveCustomMappings
	{
		public int Id { get; set; }

		public IEnumerable<AlertShortViewModel> Alerts { get; set; }

		public IEnumerable<TeamMemberShortViewModel> Members { get; set; }

		public void CreateMappings(IMapperConfigurationExpression configuration)
		{
			configuration.CreateMap<Team, TeamAlertsViewModel>()
				.ForMember(model => model.Alerts, x => x.MapFrom(src => Mapper.Map<IEnumerable<AlertShortViewModel>>(src.Alerts)))
				.ForMember(model => model.Members, x => x.MapFrom(src => Mapper.Map<IEnumerable<TeamMemberShortViewModel>>(src.Members)));
		}
	}
}
