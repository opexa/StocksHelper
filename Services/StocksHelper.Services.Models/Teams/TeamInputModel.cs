namespace StocksHelper.Services.Models.Teams
{
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;

	public class TeamInputModel
	{
		[Required]
		public string Name { get; set; }

		[MinLength(1)]
		public IEnumerable<TeamMemberInputModel> Members { get; set; }
	}
}
