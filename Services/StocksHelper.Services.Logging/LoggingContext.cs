using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StocksHelper.Data.Models;

namespace StocksHelper.Services.Logging
{
	public class LoggingContext : DbContext
	{
		public DbSet<ApplicationLog> Logs { get; set; }
		public static string ConnectionString { get; set; }

		public LoggingContext()
		{
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(ConnectionString);
			base.OnConfiguring(optionsBuilder);
		}
	}
}
