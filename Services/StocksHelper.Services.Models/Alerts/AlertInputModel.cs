namespace StocksHelper.Services.Models.Alerts
{
	using AutoMapper;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;
	using System.ComponentModel.DataAnnotations;

	public class AlertInputModel : IHaveCustomMappings
	{
		[Required]
		public string Ticker { get; set; }

		[Required]
		public decimal Price { get; set; }

		public string Notes { get; set; }

		[Required]
		public AlertMoveType MoveType { get; set; }

		[Required]
		public int TeamId { get; set; }

		public void CreateMappings(IMapperConfigurationExpression configuration)
		{
			configuration.CreateMap<AlertInputModel, Alert>()
				.ForMember(model => model.Ticker, x => x.MapFrom(src => src.Ticker.ToUpper()));
		}
	}
}
