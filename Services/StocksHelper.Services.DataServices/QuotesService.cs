namespace StocksHelper.Services.DataServices
{
	using System.Net.Http;
	using System.Threading.Tasks;
	using System.Collections.Generic;
	using Newtonsoft.Json;
	using Microsoft.Extensions.Configuration;
	using StocksHelper.Data.Models;
	using StocksHelper.Services.Models.Quotes;

	public class QuotesService : IQuotesService
	{
		private readonly string API_KEY = null;
		private readonly IHttpClientFactory clientFactory;

		public QuotesService(
			IConfiguration configuration,
			IHttpClientFactory clientFactory
		)
		{
			this.API_KEY = configuration["AlphaVantageApiKey"];
			this.clientFactory = clientFactory;
		}

		public async Task<bool> IsAlertTriggered(string ticker, decimal price, AlertMoveType moveType)
		{
			var content = await this.MakeRequest(HttpMethod.Get, $"function=GLOBAL_QUOTE&symbol={ticker}");

			content = content.Substring(1, content.Length - 2).Replace("\"Global Quote\":", "");
			for (int i = 0; i < 10; i++)
				content = content.Replace($"{i}. ", "");

			var json = JsonConvert.DeserializeObject<TickerQuoteViewModel>(content);

			if (moveType == AlertMoveType.MovesAbove)
			{
				if (json.Price >= price)
					return true;
			}
			
			if (moveType == AlertMoveType.MovesBelow)
			{
				if (json.Price <= price)
					return true;
			}

			return false;
		}

		public async Task<bool> IsTickerExisting(string ticker)
		{
			var content = await this.MakeRequest(HttpMethod.Get, $"function=SYMBOL_SEARCH&keywords={ticker}");

			content = content.Substring(1, content.Length - 2).Replace("\"bestMatches\":", "");
			for (int i = 0; i < 10; i++)
				content = content.Replace($"{i}. ", "");

			var json = JsonConvert.DeserializeObject<List<BestMatchModel>>(content);

			if (json.Count == 0)
				return false;

			return true;
		}

		private async Task<string> MakeRequest(HttpMethod method, string query)
		{
			var request = new HttpRequestMessage(method, $"query?{query}&apikey={this.API_KEY}");
			var client = clientFactory.CreateClient("aplhavantage");
			var response = await client.SendAsync(request);

			var content = await response.Content.ReadAsStringAsync();
			return content;
		}
	}
}
