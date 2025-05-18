from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

CustomUser = get_user_model()

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('__str__', 'nombre', 'is_active')
    search_fields = ('email', 'nombre')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
          'fields': ('nombre',)
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nombre', 'password1', 'password2'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)