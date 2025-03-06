document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('item-form');
    const itemsTableBody = document.getElementById('items-table-body');
    const donationMessage = document.getElementById('donation-message');

    // Comprehensive list of recyclable items
    const recyclableItems = new Set([
        'newspaper', 'magazines', 'office paper', 'junk mail', 'cardboard boxes',
        'paper bags', 'paperboard', 'milk cartons', 'egg cartons', 'paper towels',
        'glass bottles', 'glass jars', 'glass beverage containers', 'plastic water bottles',
        'plastic milk jugs', 'plastic soda bottles', 'plastic detergent bottles',
        'plastic food containers', 'plastic grocery bags', 'plastic wrap', 'hard plastic toys',
        'plastic furniture', 'plastic packaging', 'plastic bottles', 'plastic cups',
        'aluminum cans', 'steel cans', 'tin cans', 'empty aerosol cans', 'metal bottle caps',
        'aluminum foil', 'aluminum trays', 'metal pots and pans', 'old keys', 'metal scrap',
        'wood furniture', 'wooden pallets', 'wooden crates', 'wooden cutting boards',
        'textiles', 'bed linens', 'towels', 'curtains', 'rugs', 'fabric scraps',
        'e-waste', 'old batteries', 'broken electronics', 'chargers', 'power cords',
        'small appliances', 'light bulbs', 'printer cartridges', 'cell phones', 'laptops',
        'tablets', 'old DVDs and CDs', 'electronic toys', 'old gaming consoles', 'circuit boards',
        'old calculators', 'electrical wiring', 'plastic containers with the recycling symbol',
        'plastic food wrappers', 'plastic storage containers', 'plastic trays',
        'plastic yogurt containers', 'plastic lids', 'metal cans', 'metal food containers',
        'aluminum baking trays', 'metal hangers', 'broken metal furniture', 'metal scraps',
        'old magazines', 'brochures', 'paper cartons', 'paper napkins', 'paper plates',
        'paper envelopes', 'paper receipts', 'old books', 'catalogs', 'flyers',
        'shredded paper', 'post-it notes', 'telephone books', 'old blueprints',
        'old maps', 'old packaging materials', 'cardboard tubes', 'corrugated cardboard',
        'paperboard packaging', 'beverage cartons', 'tetra paks', 'wood shavings',
        'wooden stakes', 'old wooden fences'
    ]);

    // Comprehensive list of non-recyclable items
    const nonRecyclableItems = new Set([
        'food waste', 'used paper towels', 'used tissues', 'used napkins', 'styrofoam containers',
        'styrofoam cups', 'styrofoam packing peanuts', 'plastic straws', 'plastic cutlery',
        'plastic plates', 'plastic bags without recycling symbols', 'plastic wrap (if not recyclable locally)',
        'chip bags', 'candy wrappers', 'diapers', 'sanitary pads', 'tampons', 'rubber gloves',
        'rubber bands', 'ceramics', 'pyrex glass', 'window glass', 'mirrors', 'light bulbs (unless specified)',
        'incandescent bulbs', 'fluorescent tubes', 'drinking glasses', 'broken glass', 'contaminated food containers',
        'greasy pizza boxes', 'waxed paper', 'parchment paper', 'bubble wrap (if not recyclable locally)',
        'photographs', 'photo paper', 'stickers and sticker backing', 'adhesive labels', 'receipts (thermal paper)',
        'hardcover books (without separating the cover)', 'laminated paper', 'wallpaper', 'wrapping paper with glitter or foil',
        'paint cans (with residual paint)', 'oil cans', 'solvent containers', 'chemical containers', 'motor oil bottles',
        'household batteries (unless specified)', 'foam padding', 'foam insulation', 'old mattresses', 'pillows', 'stuffed animals',
        'vhs tapes', 'cassette tapes', 'cds without recycling symbols', 'dvds without recycling symbols', 'vinyl records',
        'disposable coffee cups', 'coffee pods', 'single-use coffee filters', 'tea bags (if non-compostable)', 'cigarette butts',
        'ashes (from fireplaces or BBQs)', 'cotton balls', 'cotton swabs', 'hair', 'nail clippings', 'pet waste', 'pet litter',
        'garden hoses', 'tarps', 'pool covers', 'paintbrushes', 'paint rollers', 'disposable razors', 'toothbrushes', 'toothpaste tubes',
        'makeup containers', 'nail polish bottles', 'nail polish remover containers', 'hair dye bottles', 'hair extensions', 'wigs',
        'clothing hangers', 'carpet remnants', 'floor tiles', 'bricks', 'concrete', 'construction debris',
        'medical waste', 'syringes', 'bandages', 'plasters', 'prescription bottles', 'air filters', 'wet wipes',
        'cleaning sponges', 'disposable mops', 'used cooking oil'
    ]);

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Get form values
        const itemName = document.getElementById('item-name').value.trim().toLowerCase();

        // Check if the item is recyclable or non-recyclable
        let category = 'Unknown';
        if (recyclableItems.has(itemName)) {
            category = 'Recyclable';
        } else if (nonRecyclableItems.has(itemName)) {
            category = 'Non-Recyclable';
        } else {
            // Apply basic knowledge for classification
            category = classifyItemBasedOnMaterial(itemName);
        }

        // Create a new row for the table
        const row = document.createElement('tr');

        // Create and append item name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = itemName;
        row.appendChild(nameCell);

        // Create and append category cell
        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);

        // Add the row to the table
        itemsTableBody.appendChild(row);

        // Show donation message if the item is recyclable
        if (category === 'Recyclable') {
            showDonationMessage(itemName);
        } else {
            donationMessage.innerHTML = ''; // Clear donation message if item is non-recyclable
        }

        // Clear the form input
        form.reset();
    });

    function classifyItemBasedOnMaterial(itemName) {
        if (itemName.includes('paper') || itemName.includes('cardboard')) {
            return 'Recyclable';
        } else if (itemName.includes('glass')) {
            return 'Recyclable';
        } else if (itemName.includes('plastic')) {
            return 'Recyclable';
        } else if (itemName.includes('metal') || itemName.includes('aluminum')) {
            return 'Recyclable';
        } else if (itemName.includes('wood')) {
            return 'Recyclable';
        } else if (itemName.includes('textile') || itemName.includes('fabric')) {
            return 'Recyclable';
        } else if (itemName.includes('electronics') || itemName.includes('e-waste')) {
            return 'Recyclable';
        } else if (itemName.includes('food') || itemName.includes('waste') || itemName.includes('diaper') || itemName.includes('sanitary')) {
            return 'Non-Recyclable';
        } else if (itemName.includes('styrofoam') || itemName.includes('rubber')) {
            return 'Non-Recyclable';
        } else if (itemName.includes('ceramic') || itemName.includes('pyrex')) {
            return 'Non-Recyclable';
        } else if (itemName.includes('battery') || itemName.includes('light bulb')) {
            return 'Non-Recyclable';
        } else if (itemName.includes('hazardous') || itemName.includes('chemical') || itemName.includes('medical')) {
            return 'Non-Recyclable';
        } else if (itemName.includes('cooking oil') || itemName.includes('coffee pod') || itemName.includes('cotton swab')) {
            return 'Non-Recyclable';
        } else {
            return 'Unknown';
        }
    }

    function showDonationMessage(itemName) {
        donationMessage.innerHTML = `You can also consider donating or repurposing <strong>${itemName}</strong> if it is in good condition.`;
    }
});
