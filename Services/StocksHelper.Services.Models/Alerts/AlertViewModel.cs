namespace StocksHelper.Services.Models.Alerts
{
	using AutoMapper;
	using System.ComponentModel;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;

	public class AlertViewModel : IHaveCustomMappings
	{
		public int Id { get; set; }

		public int TeamId { get; set; }

		public string Ticker { get; set; }

		public string Price { get; set; }

		public AlertMoveType MoveType { get; set; }

		public string Notes { get; set; }

		public string CreatedByUserId { get; set; }

		[DefaultValue(false)]
		public bool IsCreatedByIssuer { get; set; }

		public void CreateMappings(IMapperConfigurationExpression configuration)
		{
			configuration.CreateMap<Alert, AlertViewModel>()
				.ForMember(model => model.Price, x => x.MapFrom(src => src.Price.ToString("F")))
				.ForMember(model => model.CreatedByUserId, x => x.MapFrom(src => src.CreatedBy.UserId))
				.ForMember(model => model.IsCreatedByIssuer, x => x.Ignore());
		}
	}
}
