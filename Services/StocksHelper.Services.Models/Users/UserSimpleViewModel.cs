namespace StocksHelper.Services.Models.Users
{
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Mapping;

	public class UserSimpleViewModel: IMapFrom<ApplicationUser>
	{
		public string Id { get; set; }

		public string UserName { get; set; }
	}
}
