using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreWithReact.Models;

namespace CoreWithReact.Controllers
{
    public class StoreController : Controller
    {
        private tempSchemaContext db = new tempSchemaContext();

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get the list of all Stores from the database.
        /// </summary>
        /// <returns>List of Stores</returns>
        [HttpGet]
        public ActionResult GetStore()
        {
            var findStore = db.Store.Select(x => new { x.Id, x.Name, x.Address }).ToList();
            return Json(findStore);
        }

        /// <summary>
        /// Delete selected Store.
        /// </summary>
        /// <param name="id"> Store ID </param>
        /// <returns> New list of Store after deletion. </returns>
        [HttpPost]
        public ActionResult DeleteStore(int id)
        {
            db.Store.Remove(db.Store.Find(id));
            db.SaveChanges();
            return Json(db.Store.Select(x => new { x.Id, x.Name, x.Address }).ToList());
        }

        /// <summary>
        /// Create new Store.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="address"></param>
        /// <returns> List of Stores including newly created.</returns>
        [HttpPost]
        public ActionResult CreateStore(string name, string address)
        {
            Store newStore = new Store
            {
                Name = name,
                Address = address
            };
            db.Store.Add(newStore);
            db.SaveChanges();
            return Json(db.Store.Select(x => new { x.Id, x.Name, x.Address }).ToList());
        }

        /// <summary>
        /// Update and existing Store.
        /// </summary>
        /// <param name="id">key value.</param>
        /// <param name="newName"> New Name of the Store.</param>
        /// <param name="newAddress">New Address of the Store.</param>
        /// <returns> List of Stores with the updates.</returns>
        public ActionResult UpdateStore(int id, string newName, string newAddress)
        {
            var myStore = db.Store.Find(id);
            myStore.Name = newName;
            myStore.Address = newAddress;
            db.SaveChanges();
            return Json(db.Store.Select(x => new { x.Id, x.Name, x.Address }).ToList());
        }
    }
}