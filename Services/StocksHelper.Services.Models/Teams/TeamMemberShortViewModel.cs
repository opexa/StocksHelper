namespace StocksHelper.Services.Models.Teams
{
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;

	public class TeamMemberShortViewModel : IMapFrom<TeamMember>
	{
		public int Id { get; set; }

		public string UserId { get; set; }
	}
}
