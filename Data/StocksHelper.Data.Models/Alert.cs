using System.ComponentModel.DataAnnotations;
using StocksHelper.Data.Common.Models;

namespace StocksHelper.Data.Models
{
	public class Alert : BaseModel<int>
	{
		[Required]
		public string Ticker { get; set; }

		[Required]
		public decimal Price { get; set; }

		[Required]
		public string Notes { get; set; }

		public int TeamId { get; set; }

		public virtual Team Team { get; set; }
	}
}
