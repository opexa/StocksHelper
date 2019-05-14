namespace StocksHelper.Services.Logging
{
	using System;
	using StocksHelper.Services.Logging.Providers;

	using Microsoft.Extensions.Logging;

	public class DbLoggerProvider : ILoggerProvider
	{
		private readonly Func<string, LogLevel, bool> filter;

		public DbLoggerProvider(Func<string, LogLevel, bool> filter)
		{
			this.filter = filter;
		}

		public ILogger CreateLogger(string categoryName)
		{
			return new DbLogger(categoryName, filter);
		}

		public void Dispose()
		{
			this.Dispose();
		}
	}
}
