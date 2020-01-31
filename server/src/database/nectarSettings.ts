import { getConnection, getRepository } from "typeorm";
import { SettingsEntity } from './entities/SettingsEntity';

export default class NectarSettings {
    private exists: boolean;
    constructor() {
        this.check()
    }
    private async check() {
        let settings = await getConnection()
            .getRepository(SettingsEntity)
            .createQueryBuilder('nectar_settings')
            .getCount();
        this.generate();
        this.exists = false
        return
        if (settings === 0) {
            this.generate();
            this.exists = false
        }
        this.exists = true
    }
    public async generate() {
        if (!this.exists) {
            /*
            {
                "key": " ",
                "value": " "
            }
            */
            const keys = [
                {
                    "key": "habbo_imager",
                    "value": "https://habbo.com.br/habbo-imaging/avatarimage?figure="
                },
                {
                    "key": "starting_motto",
                    "value": "I LOVE NECTAR!!"
                },
                {
                    "key": "starting_credits",
                    "value": "30000"
                },
                {
                    "key": "starting_look_male",
                    "value": "hr-100.hd-180-1.ch-210-66.lg-270-82.sh-290-81"
                },
                {
                    "key": "starting_look_female",
                    "value": "hr-500-45.hd-600-1.ch-630-64.lg-695-73.sh-725-1408"
                },
                {
                    "key": "starting_duckets",
                    "value": "3000"
                },
                {
                    "key": "starting_diamonds",
                    "value": "30"
                },
                {
                    "key": "hotel_name",
                    "value": "Nectar"
                },
                {
                    "key": "site_link",
                    "value": "https://127.0.0.1:8080"
                },
                {
                    "key": "discord_id",
                    "value": "557240155040251905"
                },
                {
                    "key": "server_ip",
                    "value": "127.0.0.1"
                },
                {
                    "key": "server_port",
                    "value": "3001"
                },
                {
                    "key": "swf_base",
                    "value": "http://127.0.0.1:8000/swfs/gordon/PRODUCTION-201611291003-338511768/"
                },
                {
                    "key": "swf",
                    "value": "http://127.0.0.1:8000/swfs/gordon/PRODUCTION-201611291003-338511768/habbo.swf"
                },
                {
                    "key": "swf_variables",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/external_variables.txt"
                },
                {
                    "key": "swf_override_variables",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/override/external_override_variables.txt"
                },
                {
                    "key": "swf_texts",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/external_flash_texts.txt"
                },
                {
                    "key": "swf_override_texts",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/override/external_flash_override_texts.txt"
                },
                {
                    "key": "swf_figuredata",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/figuredata.xml"
                },
                {
                    "key": "swf_furnidata",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/furnidata.xml"
                },
                {
                    "key": "swf_figuremap",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/figuremap.xml"
                },
                {
                    "key": "swf_productdata",
                    "value": "http://127.0.0.1:8000/swfs/gamedata/productdata.txt"
                }
            ]
            const repo = getRepository(SettingsEntity);
            const something = new SettingsEntity();
            keys.forEach(async insert => {
                const something = new SettingsEntity();
                something.key = insert.key;
                something.value = insert.value;

                await repo.save(something);
            })
        }
    }
}