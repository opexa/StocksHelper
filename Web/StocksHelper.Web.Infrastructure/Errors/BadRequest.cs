using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace StocksHelper.Web.Infrastructure.Errors
{
	public class BadRequest : ApiError
	{
		public BadRequest() : base(400, HttpStatusCode.BadRequest.ToString()) { }

		public BadRequest(string message) : base(400, HttpStatusCode.BadRequest.ToString(), message) { }
	}
}
