using Microsoft.EntityFrameworkCore;

namespace StocksHelper.Services.Logging.Providers
{
	using System;
	using Microsoft.Extensions.Logging;
	using StocksHelper.Data;
	using StocksHelper.Data.Models;

	public class DbLogger : ILogger
	{
		private string categoryName;
		private Func<string, LogLevel, bool> filter;
		private LoggingContext context;

		public DbLogger(string categoryName, Func<string, LogLevel, bool> filter)
		{
			this.categoryName = categoryName;
			this.filter = filter;
			this.context = new LoggingContext();
		}

		public IDisposable BeginScope<TState>(TState state)
		{
			return null;
		}

		public bool IsEnabled(LogLevel logLevel)
		{
			return true;
		}

		public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
		{
			if (logLevel == LogLevel.Error)
			{
				ApplicationLog newLog = new ApplicationLog
				{
					EventId = eventId.Id,
					Message = exception.Message,
					LogLevel = logLevel.ToString(),
					CreatedOn = DateTime.Now.ToUniversalTime()
				};
				this.context.Logs.Add(newLog);
				this.context.SaveChangesAsync();
			}
		}
	}
}
