using BlazorApp1.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

// ✅ Microsoft’s recommended approach for Blazor Web App 404 handling
app.UseStatusCodePagesWithReExecute("/not-found");

app.UseHttpsRedirection();

// If you later add auth, these go here:
// app.UseAuthentication();
// app.UseAuthorization();

app.UseAntiforgery();

app.MapStaticAssets();     // maps build-produced assets as endpoints
// app.UseStaticFiles();   // optional: only needed for “plain wwwroot” serving scenarios

app.MapRazorComponents<App>()
   .AddInteractiveServerRenderMode();

app.Run();
