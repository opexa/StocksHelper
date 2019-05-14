using Microsoft.EntityFrameworkCore.Migrations;

namespace StocksHelper.Data.Migrations
{
    public partial class ApplicationUserupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Alerts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ApplicationUserId",
                table: "Teams",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Alerts_ApplicationUserId",
                table: "Alerts",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Alerts_AspNetUsers_ApplicationUserId",
                table: "Alerts",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_AspNetUsers_ApplicationUserId",
                table: "Teams",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alerts_AspNetUsers_ApplicationUserId",
                table: "Alerts");

            migrationBuilder.DropForeignKey(
                name: "FK_Teams_AspNetUsers_ApplicationUserId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ApplicationUserId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Alerts_ApplicationUserId",
                table: "Alerts");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Alerts");
        }
    }
}
