import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useRoutines } from '../contexts/RoutineContext';
import { colors } from '../theme/colors';

interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

export const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { routines } = useRoutines();

  const handleSignOut = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'person-outline',
      title: 'Editar Perfil',
      subtitle: 'Atualize suas informações pessoais',
    },
    {
      icon: 'notifications-outline',
      title: 'Notificações',
      subtitle: 'Configurar lembretes e alertas',
    },
    {
      icon: 'color-palette-outline',
      title: 'Aparência',
      subtitle: 'Tema e personalização',
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacidade',
      subtitle: 'Gerencie seus dados',
    },
    {
      icon: 'help-circle-outline',
      title: 'Ajuda & Suporte',
      subtitle: 'FAQ e contato',
    },
    {
      icon: 'document-text-outline',
      title: 'Termos de Uso',
      subtitle: 'Políticas e termos',
    },
  ];

  const totalRoutines = routines.length;
  const activeRoutines = routines.filter(r => r.days.length > 0).length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={colors.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </LinearGradient>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Usuário'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'email@exemplo.com'}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="calendar" size={22} color={colors.primary} />
              </View>
              <Text style={styles.statNumber}>{totalRoutines}</Text>
              <Text style={styles.statLabel}>Total de Rotinas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
                <Ionicons name="checkmark-circle" size={22} color={colors.success} />
              </View>
              <Text style={styles.statNumber}>{activeRoutines}</Text>
              <Text style={styles.statLabel}>Rotinas Ativas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.warning + '20' }]}>
                <Ionicons name="flame" size={22} color={colors.warning} />
              </View>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Dias de Foco</Text>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.achievementsContainer}>
                <View style={styles.achievement}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA500']}
                    style={styles.achievementBadge}
                  >
                    <Ionicons name="trophy" size={24} color="white" />
                  </LinearGradient>
                  <Text style={styles.achievementTitle}>Iniciante</Text>
                </View>
                <View style={styles.achievement}>
                  <LinearGradient
                    colors={['#C0C0C0', '#A0A0A0']}
                    style={styles.achievementBadge}
                  >
                    <Ionicons name="star" size={24} color="white" />
                  </LinearGradient>
                  <Text style={styles.achievementTitle}>7 dias</Text>
                </View>
                <View style={[styles.achievement, styles.achievementLocked]}>
                  <View style={styles.achievementBadgeLocked}>
                    <Ionicons name="lock-closed" size={24} color={colors.textMuted} />
                  </View>
                  <Text style={styles.achievementTitleLocked}>30 dias</Text>
                </View>
                <View style={[styles.achievement, styles.achievementLocked]}>
                  <View style={styles.achievementBadgeLocked}>
                    <Ionicons name="lock-closed" size={24} color={colors.textMuted} />
                  </View>
                  <Text style={styles.achievementTitleLocked}>100%</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon as any} size={22} color={colors.primary} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={colors.error} />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text style={styles.version}>Rotina Controller v1.0.0</Text>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarGradient: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  achievement: {
    alignItems: 'center',
  },
  achievementBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  achievementBadgeLocked: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  achievementTitleLocked: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  menuContainer: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error + '15',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
  },
});
