using System.Security.Policy;

namespace StocksHelper.Data.Models
{
	using System;
	using System.Collections.Generic;
	using Microsoft.AspNetCore.Identity;

	public class ApplicationUser : IdentityUser
	{
		public ApplicationUser()
		{
			this.Id = Guid.NewGuid().ToString();
			this.Alerts = new HashSet<Alert>();
			this.TeamsIn = new HashSet<Team>();
		}

		public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

		public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

		public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }

		public virtual ICollection<Alert> Alerts { get; set; }

		public virtual ICollection<Team> TeamsIn { get; set; }
	}
}
