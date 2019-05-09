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
		}

		public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

		public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

		public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }
	}
}
