using KOLTSEGVETESIELEMZO.BACKEND.Data;

namespace KOLTSEGVETESIELEMZO.BACKEND
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllersWithViews();
            builder.Services.AddSingleton<IMoneyStatsRepository, MoneyStatsRepository>();
            var app = builder.Build();

            string flaskUrl = Environment.GetEnvironmentVariable("FLASK_API_URL") ?? "http://127.0.0.1:5001";

            app.UseRouting();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}"
            );

            app.UseCors(x => x
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins($"{flaskUrl}")
            );

            app.Urls.Clear();
            app.Urls.Add("http://0.0.0.0:5284");

            app.Run();
        }
    }
}
