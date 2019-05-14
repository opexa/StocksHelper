using StocksHelper.Services.Mapping;
using StocksHelper.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace StocksHelper.Services.Models.Teams
{
	public class TeamViewModel : IMapFrom<Team>
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public bool IsPrivate { get; set; }

		public string TeamPhoto { get; set; }
	}
}
