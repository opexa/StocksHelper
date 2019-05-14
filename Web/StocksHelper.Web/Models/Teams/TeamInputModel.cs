using System.ComponentModel.DataAnnotations;

namespace StocksHelper.Web.Models.Teams
{
	public class TeamInputModel
	{
		[Required]
		public string Name { get; set; }
	}
}
