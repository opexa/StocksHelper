using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace StocksHelper.Data.Models
{
	public class ApplicationRole : IdentityRole
	{
		public ApplicationRole() : this(null) { }

		public ApplicationRole(string name) : base(name)
		{
			this.Id = Guid.NewGuid().ToString();
		}
	}
}
