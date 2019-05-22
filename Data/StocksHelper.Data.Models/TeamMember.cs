using System.Collections.Generic;

namespace StocksHelper.Data.Models
{
	using System.ComponentModel.DataAnnotations;
	using StocksHelper.Data.Common.Models;

	public class TeamMember : BaseModel<int>
	{
		public TeamMember()
		{
			this.TeamAlerts = new HashSet<Alert>();
		}

		[Required]
		public string UserId { get; set; } 

		public virtual ApplicationUser User { get; set; }

		[Required]
		public int TeamId { get; set; }

		public virtual Team Team { get; set; }

		[Required]
		public TeamRole TeamRole { get; set; }

		public virtual ICollection<Alert> TeamAlerts { get; set; }
	}
}
