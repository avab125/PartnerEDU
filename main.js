//Global variables:
let partnerLSInformation = JSON.parse(localStorage.getItem('partnerLSInformation')) || [];
let partnerName = "";
let partnerOrganizationType = "";
let partnerDescription = "";
let partnerResources = "";
let partnerMainContactName = "";
let partnerMainContactEmail = "";
let partnerMainContactPhoneNumber = "";
let partnerImage = "";
let deletePartnerID = "";


//Adding a new partner:
function saveNewPartner() {
    //New partner information inputted by the user is gathered:
    partnerName = document.getElementById("partnerNameInput").value;
    partnerOrganizationType = document.getElementById("typeOfOrganizationInput").value;
    partnerDescription = document.getElementById("descriptionInput").value;
    partnerResources = document.getElementById("typeOfResourceInput").value;
    partnerMainContactName = document.getElementById("mainContactNameInput").value;
    partnerMainContactEmail = document.getElementById("mainContactEmailInput").value;
    partnerMainContactPhoneNumber = document.getElementById("mainContactPhoneNumberInput").value;
    partnerImage = document.getElementById("partnerImageInput").value;

    //If no partner name is entered, a partner is not added.
    if (partnerName == ""){
        return;
    } else {
            //Changes default values to "" if no custom value is chosen.
        if (partnerOrganizationType == "Choose a type of organization"){
            partnerOrganizationType = "";
        }
        if (partnerResources == "Choose a type of resource"){
            partnerResources = "";
        }
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
        partnerLSInformation.push(partner);
    
        localStorage.setItem('partnerLSInformation', JSON.stringify(partnerLSInformation));
        //Reloads the page and clears all form fields:
        location.reload();
}
}


function createPartner (list){
let id = "";
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
        id = ((Date.now())+(Math.floor(Math.random() * 100)));
        specificPartner.id = id;

        const newPartnerLi = document.createElement('li');
        newPartnerLi.setAttribute('class', 'partnerLists');
        newPartnerLi.setAttribute('id', id);
        
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
        newPartnerLi.innerHTML = newPartnerLiMarkup;
        document.getElementById("partnerLists").appendChild(newPartnerLi);
    }
}

function deletePartner(){
    let partnerID = "";
    function locateID (){
        partnerID = event.target.parentNode.id;
      }
    locateID();
    let partnerIndex = partnerLSInformation.findIndex(object => {
        return object.id == partnerID;
    });

    document.getElementById(partnerID).remove();
    partnerLSInformation.splice(partnerIndex, 1);
    localStorage.setItem('partnerLSInformation', JSON.stringify(partnerLSInformation));
}


console.log(partnerLSInformation);

function searchPartners () {
    event.preventDefault();
    let searchInput = document.getElementById('searchInput').value;
    console.log(searchInput);

    const searchedPartnerLI = partnerLSInformation.filter((object) => {
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
    document.getElementById('partnerLists').innerHTML = '';
    createPartner(searchedPartnerLI);
}

function filterPartners(){
    event.preventDefault();
    let organizationTypeFilter = document.getElementById('organizationTypeFilter').value;
    let resourceTypeFilter = document.getElementById('resourceFilter').value;

    const filterededPartnerLI1 = partnerLSInformation.filter((object) => {
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
    const filterededPartnerLI2 = filterededPartnerLI1.filter((object) => {
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
    document.getElementById('partnerLists').innerHTML = '';
    createPartner(filterededPartnerLI2);
}