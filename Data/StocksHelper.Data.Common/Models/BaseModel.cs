using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StocksHelper.Data.Common.Models
{
	public abstract class BaseModel<TKey>
	{
		[Key]
		public TKey Id { get; set; }
	}
}
