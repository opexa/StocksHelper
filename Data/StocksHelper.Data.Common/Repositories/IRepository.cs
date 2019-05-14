using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StocksHelper.Data.Common.Repositories
{
	public interface IRepository<TEntity> : IDisposable where TEntity : class
	{
		IQueryable<TEntity> All();

		Task<TEntity> FindAsync(params object[] id);

		void Add(TEntity entity);

		void Update(TEntity entity);

		void Delete(TEntity entity);

		Task<int> SaveChangesAsync();
	}
}
