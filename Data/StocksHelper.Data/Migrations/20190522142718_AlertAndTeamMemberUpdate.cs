using Microsoft.EntityFrameworkCore.Migrations;

namespace StocksHelper.Data.Migrations
{
    public partial class AlertAndTeamMemberUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alerts_AspNetUsers_ApplicationUserId",
                table: "Alerts");

            migrationBuilder.DropIndex(
                name: "IX_Alerts_ApplicationUserId",
                table: "Alerts");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Alerts");

            migrationBuilder.AlterColumn<string>(
                name: "Ticker",
                table: "Alerts",
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Alerts",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Alerts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Alerts_CreatedById",
                table: "Alerts",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Alerts_TeamMembers_CreatedById",
                table: "Alerts",
                column: "CreatedById",
                principalTable: "TeamMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alerts_TeamMembers_CreatedById",
                table: "Alerts");

            migrationBuilder.DropIndex(
                name: "IX_Alerts_CreatedById",
                table: "Alerts");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Alerts");

            migrationBuilder.AlterColumn<string>(
                name: "Ticker",
                table: "Alerts",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 5);

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "Alerts",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Alerts",
                nullable: true);

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
        }
    }
}
