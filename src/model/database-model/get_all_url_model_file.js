const pool = require('../../_database/db_config');
const pool2 = require('../../_database/db_config_2');

const getAllUrlModel = async () => {

    const query = 'SELECT id, file, file_id FROM vessel_file WHERE file_id IS NOT NULL;';
    const query2 = 'INSERT INTO migration_table_files (old_id, old_url) VALUES($1, $2) ON CONFLICT (old_id) DO NOTHING;';
    const query3 = 'SELECT * FROM migration_table_files;';
    const query4 = 'SELECT old_id FROM migration_table_files;'

    try {
        const response = await pool.query(query);
        const response2 = await pool2.query(query4);
        
        const rows = response.rows;
        const existing_ids = response2.rows;

        const hash_ids = existing_ids.reduce((acc, current) => {
            acc[current.old_id] = true;
            return acc;
        }, {});

        for (var i = 0; i < rows.length; i++ ){ 
            if (!hash_ids[rows[i].id]) {
                const params = [rows[i].id, rows[i].file];
                await pool2.query(query2, params);
            }
        }

        const response3 = await pool2.query(query3);

        return response3.rows;
    } catch (error) {
        console.log('get all url model error says:', error.message);
    }

}

module.exports = getAllUrlModel;