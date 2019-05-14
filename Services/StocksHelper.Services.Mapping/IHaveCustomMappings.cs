
namespace StocksHelper.Services.Mapping
{
	using AutoMapper;

	interface IHaveCustomMappings
	{
		void CreateMappings(IMapperConfigurationExpression configuration);
	}
}
