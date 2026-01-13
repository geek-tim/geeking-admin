namespace Entity {
    interface Permission {
        id: number
        resource: ResourceType
        action: PermissionAction
        description?: string
        createdAt: Date
        updatedAt: Date
    }
}
