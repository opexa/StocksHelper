using Microsoft.EntityFrameworkCore.Migrations;

namespace StocksHelper.Data.Migrations
{
    public partial class AlertMoveTypeAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MoveType",
                table: "Alerts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MoveType",
                table: "Alerts");
        }
    }
}
