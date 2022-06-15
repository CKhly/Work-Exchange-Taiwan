const Host = require('../models/host_model');
const pageSize = 4;

const createHost = async (req, res) => {
    const body = req.body;
    const host = {
        host_id: body.host_id,
        host_name: body.host_name,
        host_contacts: body.contacts,
        host_category: body.category,
        host_location: body.location,
        host_address: body.address,
        host_gender_needs: body.gender,
        short_period: body.short_period,
        host_description: body.description,
        host_needs: body.needs,
        host_benefits: body.benefits,
        host_others: body.others,
    }
    host.host_mainImage = req.files.main_image[0].filename;
    const images = req.files.other_images.map(
        img => ([host.host_id, img.filename])
    )
    const vacants = [[
        body.host_id,
        body.start_date,
        body.end_date,
        body.vacants
    ]]
    console.log(host)
    console.log(images)
    console.log(vacants)
    const hostId = await Host.createHost(host, vacants, images);
    //const hostId = await Host.createHost(host, vacants, images);
    if (hostId == -1) {
        res.status(500);
    } else {
        res.status(200).send({hostId});
    }
}

const getHosts = async (req, res) => {
    const location = req.params.location;
    const paging = parseInt(req.query.paging) || 0;
    async function findHost(location) {
        switch (location) {
            case 'all':
                return await Host.getHosts(pageSize, paging);
            case 'Taiwan': case 'GreenIsland': case 'LanYu': case 'XiaoLiuQiu': case 'KinMen': case 'LaMatSu': case 'Others':
                return await Host.getHosts(pageSize, paging, {location});
            case 'search': { 
                const keyword = req.query.keyword;
                if (keyword) {
                    return await Host.getHosts(pageSize, paging, {keyword});
                } 
                break;
            }
            case 'filter': {
                const genderNeeds = req.query.genderNeeds;
                const category = req.query.category;
                const shortPeriod = req.query.shortPeriod;
                if (genderNeeds && category && shortPeriod){
                    return await Host.getHosts(pageSize, paging, {genderNeeds, category, shortPeriod});
                }
                break;
            }
        }
        return Promise.resolve({});
    }
    const {hosts, hostCount} = await findHost(location);
    if (!hosts) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    const result = (hostCount > (paging + 1) * pageSize) ? {
        data: hosts,
        next_paging: paging + 1
    } : {
        data: hosts,
    };

    res.status(200).json(result);
}

const getHostDetail = async (req, res) => {
    const id = req.params.id;
    async function findHostDetail(id) {
        console.log("test")
        // if (Number.isInteger(id)) {
            console.log("hi")
            const info =  await Host.getHosts(1, 0, {id});
            const vacants = await Host.getHostVacants(id);
            const comments = await Host.getHostComments(id);
            const images = await Host.getHostImages(id);  
            return {
                info,
                vacants,
                comments,
                images
            }
        // }
    }
    const hostdetail = await findHostDetail(id);
    console.log(hostdetail);
    
    res.status(200).json(hostdetail);
}

module.exports = {
    createHost,
    getHosts,
    getHostDetail,
};