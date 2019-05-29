namespace StocksHelper.Services.Models.Alerts
{
	using StocksHelper.Services.Mapping;
	using StocksHelper.Data.Models;

	public class AlertShortViewModel : IMapFrom<Alert>
	{
		 public string Ticker { get; set; }

		 public decimal Price { get; set; }

		 public AlertMoveType MoveType { get; set; }
	}
}
