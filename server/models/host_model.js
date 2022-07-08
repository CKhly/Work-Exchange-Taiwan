const { pool } = require('./mysqlcon');

const createHost = async (host, vacants, images) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query('INSERT INTO host_table SET ?', host);
        console.log("insertID: ", result.insertId)
        await conn.query('INSERT INTO host_vacants(host_id, vacant_start_date, vacant_end_date, vacant_count) VALUES ?', [vacants]);
        await conn.query('INSERT INTO host_images(host_id, host_image) VALUES ?', [images]);
        return result.insertId;
    } catch (error) {
        console.log(error);
        return -1;
    } finally {
        await conn.release();
    }
};


const getHosts = async (pageSize, paging = 0, requirement = {}) => {
    const condition = {
        sql: '',
        binding: [],
    };
    console.log('requirement', requirement);
    if (requirement.location != null) {
        console.log("location:", requirement.location)
        condition.sql = 'WHERE host_table.host_location = ?';
        condition.binding = [requirement.location];
    } else if (requirement.keyword != null) {
        console.log("keyword: ", requirement.keyword);
        condition.sql = 'WHERE host_table.host_name LIKE ?';
        condition.binding = [`%${requirement.keyword}%`];
    } else if (requirement.id != null) {
        console.log("id: ", requirement.id)
        condition.sql = 'WHERE host_table.host_id = ?';
        condition.binding = [requirement.id];
    } else if(requirement.genderNeeds != null){
        console.log(requirement.genderNeeds, requirement.category, requirement.shortPeriod)
        condition.sql = 'WHERE host_table.host_gender_needs IN (?) && host_table.host_category IN (?)  && host_table.short_period IN (?)';
        condition.binding = [
            [requirement.genderNeeds], 
            [requirement.category], 
            [requirement.shortPeriod]
        ]; 
    }

    const limit = {
        sql: 'LIMIT ?, ?',
        binding: [pageSize * paging, pageSize],
    };

    const hostQuery = 'SELECT host_table.*, location.name as location_name, category.name as category_name, gender.name as gender_name FROM host_table LEFT JOIN location on location.id = host_table.host_location LEFT JOIN category on category.id = host_table.host_category LEFT JOIN gender on gender.id = host_table.host_gender_needs ' + condition.sql + ' ORDER BY host_id ' + limit.sql;
    const hostBindings = condition.binding.concat(limit.binding);
    const [hosts] = await pool.query(hostQuery, hostBindings);

    const hostCountQuery = 'SELECT COUNT(*) as count FROM host_table ' + condition.sql;
    const hostCountBindings = condition.binding;
    const [hostCounts] = await pool.query(hostCountQuery, hostCountBindings);

    return {
        hosts: hosts,
        hostCount: hostCounts[0].count,
    };
};

const getHostsStatistics = async () => {
    console.log("getHostsStatistics");
    const locationQueryStr = 'SELECT location.*, count(host_table.host_id) as count FROM location LEFT JOIN host_table on host_table.host_location = location.id GROUP BY location.name';
    const categoryQueryStr = 'SELECT category.*, count(host_table.host_id) as count FROM category LEFT JOIN host_table on host_table.host_category = category.id GROUP BY category.name';
    const likesQueryStr = 'SELECT host_table.*, location.name as location_name, category.name as category_name, gender.name as gender_name FROM host_table LEFT JOIN location on location.id = host_table.host_location LEFT JOIN category on category.id = host_table.host_category LEFT JOIN gender on gender.id = host_table.host_gender_needs ORDER BY host_table.host_likes DESC LIMIT 5';
    const lastupdateQueryStr = 'SELECT host_table.*, location.name as location_name, category.name as category_name, gender.name as gender_name FROM host_table LEFT JOIN location on location.id = host_table.host_location LEFT JOIN category on category.id = host_table.host_category LEFT JOIN gender on gender.id = host_table.host_gender_needs  ORDER BY host_table.host_create_date DESC LIMIT 5';
    const [locationResult] = await pool.query(locationQueryStr);
    const [categoryResult] = await pool.query(categoryQueryStr);
    const [likesResult] = await pool.query(likesQueryStr);
    const [lastupdateResult] = await pool.query(lastupdateQueryStr);
    return [locationResult, categoryResult, likesResult, lastupdateResult];
}

const getHostImages = async (hostId) => {
    console.log("getHostImages")
    const queryStr = 'SELECT * FROM host_images WHERE host_id IN (?)';
    const bindings = [hostId];
    const [images] = await pool.query(queryStr, bindings);
    return images;
};

const getHostComments = async (hostId) => {
    const queryStr = 'SELECT user_table.name, user_table.picture, comments.* FROM comments LEFT JOIN user_table ON comments.user_id = user_table.user_id WHERE host_id IN (?)';
    const bindings = [hostId];
    const [comments] = await pool.query(queryStr, bindings);
    return comments;
};

const getHostVacants = async (hostId) => {
    const queryStr = 'SELECT * FROM host_vacants WHERE host_id IN (?)';
    const bindings = [hostId];
    const [vacants] = await pool.query(queryStr, bindings);
    return vacants;
};

const getHostLikes = async (hostId) => {
    const queryStr = 'SELECT count(user_id) FROM likes WHERE host_id IN (?)';
    const bindings = [hostId];
    const [likes] = await pool.query(queryStr, bindings);
    return likes;
};


module.exports = {
    createHost,
    getHosts,
    getHostsStatistics,
    getHostImages,
    getHostComments,
    getHostVacants,
    getHostLikes
};