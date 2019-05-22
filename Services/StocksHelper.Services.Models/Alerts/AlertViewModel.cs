namespace StocksHelper.Services.Models.Alerts
{
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;

	public class AlertViewModel: IMapFrom<Alert>
	{
		public int TeamId { get; set; }

		public string Ticker { get; set; }

		public decimal Price { get; set; }

		public int MoveType { get; set; }

		public string Notes { get; set; }
	}
}
