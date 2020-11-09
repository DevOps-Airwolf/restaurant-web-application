using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Queue;

namespace RestaurantWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantMenuController : ControllerBase
    {
        private readonly IOptions<MyConfig> config;

        public RestaurantMenuController(IOptions<MyConfig> config)
        {
            this.config = config;
        }

        [HttpGet("File/{fileName}")]
        public async Task<IActionResult> DisplayFile(string fileName)
        {
            MemoryStream ms = new MemoryStream();

            if (CloudStorageAccount.TryParse(config.Value.StorageConnection, out CloudStorageAccount storageAccount))
            {
                CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = BlobClient.GetContainerReference(config.Value.Container);

                if (await container.ExistsAsync())
                {
                    CloudBlockBlob blob = container.GetBlockBlobReference(fileName);

                    if (await blob.ExistsAsync())
                    {
                        string contents = blob.DownloadTextAsync().Result;
                        return Content(contents);
                    }
                    else
                    {
                        return Content("File does not exist");
                    }
                }
                else
                {
                    return Content("Container does not exist");
                }
            }
            else
            {
                return Content("Error opening storage");
            }
        }

        [HttpGet("PlaceOrder")]
        public async Task<IActionResult> NewOrderOccurred()
        {
            if (CloudStorageAccount.TryParse(config.Value.StorageConnection, out CloudStorageAccount storageAccount))
            {
                CloudQueueClient queueClient = storageAccount.CreateCloudQueueClient();
                CloudQueue queue = queueClient.GetQueueReference(config.Value.Queue);

                if (await queue.ExistsAsync())
                {
                    CloudQueueMessage queueMessage = new CloudQueueMessage("A new order has been occurred.");
                    await queue.AddMessageAsync(queueMessage);

                    return Content("Your message has been sent to the Queue.");
                }
                else
                {
                    return Content("Queue does not exist");
                }
            }
            else
            {
                return Content("Error opening storage");
            }
        }
    }
}
