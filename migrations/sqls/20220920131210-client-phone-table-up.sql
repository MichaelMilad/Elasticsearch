CREATE TABLE client_phone (
    `id` BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(50) UNIQUE NOT NULL,
    `number` VARCHAR(15) NOT NULL,
    `type` ENUM ('home', 'cell', 'work', 'other') NOT NULL DEFAULT 'cell',
    `clientId` BIGINT NOT NULL,
    `clientContactId` BIGINT DEFAULT null,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`clientId`) REFERENCES `client`(`id`),
	FOREIGN KEY (`clientContactId`) REFERENCES `client_contact`(`id`),
	CONSTRAINT `number` CHECK (LENGTH(number) >= 6)
);
