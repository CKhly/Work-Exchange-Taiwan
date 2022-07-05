const Host = require('../models/host_model');
const pageSize = 40;
const { GetCoordinates } = require('../../util/util')

const createHost = async (req, res) => {
    console.log("createHost")
    const body = req.body;
    const location = await GetCoordinates(body.host_name);
    const host = {
        host_id: body.host_id,
        host_name: body.host_name,
        host_contacts: body.contacts,
        host_category: body.category,
        host_location: body.location,
        host_lng: location[0],
        host_lat: location[1],
        host_gender_needs: body.gender,
        short_period: body.short_period,
        host_description: body.description,
        host_needs: body.needs,
        host_benefits: body.benefits,
        host_others: body.others,
        host_create_date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    console.log("host: ", host)
    host.host_mainImage = req.files.main_image[0].filename;
    console.log("host_mainImage: ", host.host_mainImage)
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
            case 'Taiwan': 
                return await Host.getHosts(pageSize, paging, {location:1});
            case 'GreenIsland': 
                return await Host.getHosts(pageSize, paging, {location:5});
            case 'LanYu':
                return await Host.getHosts(pageSize, paging, {location:6});
            case 'XiaoLiuQiu':
                return await Host.getHosts(pageSize, paging, {location:7});
            case 'PenHu':
                return await Host.getHosts(pageSize, paging, {location:8});
            case 'KinMen':
                return await Host.getHosts(pageSize, paging, {location:9});
            case 'MaTsu':
                return await Host.getHosts(pageSize, paging, {location:10});
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

const getHostsStatistics = async (req, res) => {
    const hostStats = await Host.getHostsStatistics();
    res.status(200).json(hostStats);
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
    getHostsStatistics,
    getHostDetail,
};