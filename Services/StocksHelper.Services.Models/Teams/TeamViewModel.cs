namespace StocksHelper.Services.Models.Teams
{
	using System.Linq;
	using AutoMapper;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;

	public class TeamViewModel : IMapFrom<Team>
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public bool IsPrivate { get; set; }

		public string TeamPhoto { get; set; }

		public string RoleInTeam { get; set; }
	}
}
