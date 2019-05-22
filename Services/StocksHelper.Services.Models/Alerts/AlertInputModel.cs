namespace StocksHelper.Services.Models.Alerts
{
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;
	using System.ComponentModel.DataAnnotations;

	public class AlertInputModel: IMapTo<Alert>
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
	}
}
