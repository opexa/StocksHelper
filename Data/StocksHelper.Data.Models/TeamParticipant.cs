using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using StocksHelper.Data.Common.Models;

namespace StocksHelper.Data.Models
{
	public class TeamParticipant : BaseModel<int>
	{
		[Required]
		public string UserId { get; set; } 

		public virtual ApplicationUser User { get; set; }

		[Required]
		public int TeamId { get; set; }

		public virtual Team Team { get; set; }

		[Required]
		public TeamRole TeamRole { get; set; }
	}
}
