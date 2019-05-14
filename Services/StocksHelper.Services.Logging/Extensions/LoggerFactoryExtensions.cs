using System;
namespace StocksHelper.Services.Logging.Extensions
{
	using Microsoft.Extensions.Logging;

	public static class LoggerFactoryExtensions
	{
		public static ILoggerFactory AddContext(
			this ILoggerFactory factory,
			Func<string, LogLevel, bool> filter = null
		)
		{
			factory.AddProvider(new DbLoggerProvider(filter));
			return factory;
		}

		public static ILoggerFactory AddContext(
			this ILoggerFactory factory,
			LogLevel minLevel
		)
		{
			return AddContext(factory, (_, LogLevel) => LogLevel >= minLevel);
		}
	}
}
