using System.ComponentModel.DataAnnotations;
using StocksHelper.Data.Common.Models;

namespace StocksHelper.Data.Models
{
	public class Alert : BaseModel<int>
	{
		[Required]
		[MinLength(1), MaxLength(5)]
		public string Ticker { get; set; }

		[Required]
		public decimal Price { get; set; }

		public string Notes { get; set; }

		[Required]
		public AlertMoveType MoveType { get; set; }

		[Required]
		public int TeamId { get; set; }

		public virtual Team Team { get; set; }

		[Required]
		public int CreatedById { get; set; }

		public virtual TeamMember CreatedBy { get; set; }
	}
}
