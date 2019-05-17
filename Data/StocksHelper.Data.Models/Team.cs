using StocksHelper.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StocksHelper.Data.Models
{
	public class Team : BaseModel<int>
	{
		public Team()
		{
			this.Members = new HashSet<TeamMember>();
			this.Alerts = new HashSet<Alert>();
		}

		[Required]
		public string Name { get; set; }

		[DefaultValue(false)]
		public bool IsPrivate { get; set; }

		public string TeamPhoto { get; set; }

		public virtual ICollection<TeamMember> Members { get; set; }

		public virtual ICollection<Alert> Alerts { get; set; }
	}
}
