using System;

namespace StocksHelper.Data.Models
{
	using StocksHelper.Data.Common.Models;

	public class ApplicationLog : BaseModel<int>
	{
		public int EventId { get; set; }

		public string Message { get; set; }

		public string LogLevel { get; set; }

		public DateTime CreatedOn { get; set; }
	}
}
