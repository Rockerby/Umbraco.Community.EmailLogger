using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog.Context;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Persistence.EFCore.Scoping;
using Umbraco.Community.EmailLogger.Context;
using Umbraco.Community.EmailLogger.Models;

namespace Umbraco.Community.EmailLogger.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Umbraco.Community.EmailLogger")]
    public class UmbracoCommunityEmailLoggerApiController : UmbracoCommunityEmailLoggerApiControllerBase
    {
        private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
        private readonly IEFCoreScopeProvider<EmailLogContext> _efCoreScopeProvider;

        public UmbracoCommunityEmailLoggerApiController(IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
            IEFCoreScopeProvider<EmailLogContext> efCoreScopeProvider)
        {
            _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
            _efCoreScopeProvider = efCoreScopeProvider;
        }

        [HttpGet("ping")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string Ping() => "Pong";

        [HttpGet("whatsTheTimeMrWolf")]
        [ProducesResponseType(typeof(DateTime), 200)]
        public DateTime WhatsTheTimeMrWolf() => DateTime.Now;

        [HttpGet("whatsMyName")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        public string WhatsMyName()
        {
            // So we can see a long request in the dashboard with a spinning progress wheel
            Thread.Sleep(2000);

            var currentUser = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
            return currentUser?.Name ?? "I have no idea who you are";
        }

        [HttpGet("whoAmI")]
        [ProducesResponseType<IUser>(StatusCodes.Status200OK)]
        public IUser? WhoAmI() => _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;

        [HttpGet("all")]
        [ProducesResponseType<IEnumerable<EmailLog>>(StatusCodes.Status200OK)]
        public async Task<IEnumerable<EmailLog>> All()
        {
            using IEfCoreScope<EmailLogContext> scope = _efCoreScopeProvider.CreateScope();
            IEnumerable<EmailLog> comments = await scope.ExecuteWithContextAsync(async db => db.EmailLogs.ToArray());
            scope.Complete();
            return comments;
        }
    }
}
