//The array below stores all partner information within Local Storage and is updated dynamically as users interact with the program.
let partnerLSInformation = JSON.parse(localStorage.getItem('partnerLSInformation')) || [];

//------------------------------------------------------------------------------------------------------------------------------------------

//Adding a new partner to the Local Storage database:
function saveNewPartner() {
    //All new partner information inputted by the user is gathered from the document and stored in local variables for this function:
    let partnerName = document.getElementById("partnerNameInput").value;
    let partnerOrganizationType = document.getElementById("typeOfOrganizationInput").value;
    let partnerDescription = document.getElementById("descriptionInput").value;
    let partnerResources = document.getElementById("typeOfResourceInput").value;
    let partnerMainContactName = document.getElementById("mainContactNameInput").value;
    let partnerMainContactEmail = document.getElementById("mainContactEmailInput").value;
    let partnerMainContactPhoneNumber = document.getElementById("mainContactPhoneNumberInput").value;
    let partnerImage = document.getElementById("partnerImageInput").value;

    //If no partner name is entered, this function does not run, and a partner is not added.
    if (partnerName == ""){
        return;
    } else {
        //If no values are chosen by the user in the dropdown menus, the values of those fields will be void.
        if (partnerOrganizationType == "Choose a type of organization"){
            partnerOrganizationType = "";
        }
        if (partnerResources == "Choose a type of resource"){
            partnerResources = "";
        }
        //A new object is created to store all of the new partner information.
        const partner = {
            partnerName: partnerName,
            partnerOrganizationType: partnerOrganizationType,
            partnerDescription: partnerDescription,
            partnerResources: partnerResources,
            partnerMainContactName: partnerMainContactName,
            partnerMainContactEmail: partnerMainContactEmail,
            partnerMainContactPhoneNumber: partnerMainContactPhoneNumber,
            partnerImage: partnerImage
        }
        //The partner object is added to the partnerLSInformation list and is entered into Local Storage.
        partnerLSInformation.push(partner);
        localStorage.setItem('partnerLSInformation', JSON.stringify(partnerLSInformation));
        
        //Reloads the page and clears all form fields.
        location.reload();
}
}

//------------------------------------------------------------------------------------------------------------------------------------------

//Rendering a given partner list onto the document.
function createPartner (list){
    //Iterates through each index of the given list 
    for (var i = 0; i<list.length; i++){
        let specificPartner = list[i];
        let partnerName = specificPartner["partnerName"];
        let partnerImage = specificPartner["partnerImage"];
        let partnerOrganizationType = specificPartner["partnerOrganizationType"];
        let partnerDescription = specificPartner["partnerDescription"];
        let partnerResources = specificPartner["partnerResources"];
        let partnerMainContactName = specificPartner["partnerMainContactName"];
        let partnerMainContactEmail = specificPartner["partnerMainContactEmail"];
        let partnerMainContactPhoneNumber = specificPartner["partnerMainContactPhoneNumber"];
        //Unique IDs are assigned to each partner for deletion purposes.
        //*Please see the deletePartner() function to learn more about the purpose of this feature.*
        let id = ((Date.now())+(Math.floor(Math.random() * 100)));
        specificPartner.id = id;

        //The list item where the partnered will be rendered is created.
        const newPartnerLi = document.createElement('li');
        newPartnerLi.setAttribute('class', 'partnerLists');
        //The partner's ID is assigned to its list item.
        newPartnerLi.setAttribute('id', id);

        //The HTML markup for the partner's list item is populated with the partner's information.
        const newPartnerLiMarkup = `
        <img id= "partnerImage" src="${partnerImage}"
            style="width:100px"></img>
            <table class="partnerInformation">
                <tr> <th>Partner Name:</th> <td id="partnerName">${partnerName}</td> </tr>
                <tr> <th>Type of Organization:</th> <td id="typeOfOrganization">${partnerOrganizationType}</td> </tr>
                <tr> <th>Description:</th> <td id="descriptionInput">${partnerDescription}</td> </tr>
                <tr> <th>Resources:</th> <td id="resources">${partnerResources}</td> </tr>
                <tr> <th>Main Contact Name:</th> <td id="mainContactName">${partnerMainContactName}</td> </tr>
                <tr> <th>Main Contact Email:</th> <td id="mainContactEmail">${partnerMainContactEmail}</td> </tr>
                <tr> <th>Main Contact Phone Number:</th> <td id="mainContactPhoneNumber">${partnerMainContactPhoneNumber}</td> </tr>
            </table>
            <button class="deletePartner" id="deletePartner" onclick="deletePartner()">Delete Partner</button>
    `;
        //The list item is populated with the HTML markup.
        newPartnerLi.innerHTML = newPartnerLiMarkup;

        //The list item is added to the document.
        document.getElementById("partnerLists").appendChild(newPartnerLi);
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------

//Removes partners from the document and from the Local Storage database.
function deletePartner(){
    let partnerID = "";

    //The ID of the partner that the user wants to delete is collected.
    function locateID (){
        partnerID = event.target.parentNode.id;
      }
    locateID();

    //The index of the partner's ID is located within the partnerLSInformation list.
    let partnerIndex = partnerLSInformation.findIndex(object => {
        return object.id == partnerID;
    });

    //The partner is removed from the document.
    document.getElementById(partnerID).remove();

    //The partner is removed from the partnerLSInformation list and the Local Storage is updated.
    partnerLSInformation.splice(partnerIndex, 1);
    localStorage.setItem('partnerLSInformation', JSON.stringify(partnerLSInformation));
}

//------------------------------------------------------------------------------------------------------------------------------------------

//Searching for partners via user input.
function searchPartners () {
    //Prevents the page from reloading and voiding the user input.
    event.preventDefault();
    
    //Gathers the user input from the search input form.
    let searchInput = document.getElementById('searchInput').value;

    //Creates a new list of partners that include the user's input data somewhere within their displayed information.
    const searchedPartnerUL = partnerLSInformation.filter((object) => {
        return(
            object.partnerName.includes(searchInput) ||
            object.partnerOrganizationType.includes(searchInput) ||
            object.partnerDescription.includes(searchInput) ||
            object.partnerResources.includes(searchInput) ||
            object.partnerMainContactName.includes(searchInput) ||
            object.partnerMainContactEmail.includes(searchInput) ||
            object.partnerMainContactPhoneNumber.includes(searchInput)
        );
    });

    //Resets the document's list of partners.
    document.getElementById('partnerLists').innerHTML = '';
    //Renders the filtered partner list.
    createPartner(searchedPartnerUL);
}

//------------------------------------------------------------------------------------------------------------------------------------------

//Filtering partners via user input.
function filterPartners(){
    //Prevents the page from reloading and voiding the user input.
    event.preventDefault();

    //Gathers the user input from the filter input forms.
    let organizationTypeFilter = document.getElementById('organizationTypeFilter').value;
    let resourceTypeFilter = document.getElementById('resourceFilter').value;

    /*Creates a new list of partners that include the user's input data (*REGARDING A TYPE OF ORGANIZATION*)
    somewhere within their displayed information.*/
    const filterededPartnerUL1 = partnerLSInformation.filter((object) => {
        return(
            object.partnerName.includes(organizationTypeFilter) ||
            object.partnerOrganizationType.includes(organizationTypeFilter) ||
            object.partnerDescription.includes(organizationTypeFilter) ||
            object.partnerResources.includes(organizationTypeFilter) ||
            object.partnerMainContactName.includes(organizationTypeFilter) ||
            object.partnerMainContactEmail.includes(organizationTypeFilter) ||
            object.partnerMainContactPhoneNumber.includes(organizationTypeFilter)
        );
    });
    /*Uses the previously created list to create an additional list of partners that include the user's input data
    (*REGARDING A TYPE OF RESOURCE*) somewhere within their displayed information.*/
    //This final list will only include partners that meet the parameters of both user input items.
    const filterededPartnerUL2 = filterededPartnerUL1.filter((object) => {
        return(
            object.partnerName.includes(resourceTypeFilter) ||
            object.partnerOrganizationType.includes(resourceTypeFilter) ||
            object.partnerDescription.includes(resourceTypeFilter) ||
            object.partnerResources.includes(resourceTypeFilter) ||
            object.partnerMainContactName.includes(resourceTypeFilter) ||
            object.partnerMainContactEmail.includes(resourceTypeFilter) ||
            object.partnerMainContactPhoneNumber.includes(resourceTypeFilter)
            );
    });
    
    //Resets the document's list of partners.
    document.getElementById('partnerLists').innerHTML = '';
    //Renders the filtered partner list.
    createPartner(filterededPartnerUL2);
}
