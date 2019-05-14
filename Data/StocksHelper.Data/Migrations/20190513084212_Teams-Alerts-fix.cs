using Microsoft.EntityFrameworkCore.Migrations;

namespace StocksHelper.Data.Migrations
{
    public partial class TeamsAlertsfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TeamId",
                table: "Alerts",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TeamId",
                table: "Alerts",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
