-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `category_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Expenses_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
